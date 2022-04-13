const { models } = require('mongoose');
const Register = require('../models/registerModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email.js');
const multer = require('multer');
const aws = require('aws-sdk');


module.exports = {


    img: async (req, res) => {
        try {
            res.json({ success: "true", message: 'image upload' })
        } catch (error) {
            res.json({ success: "false", message: "not a upload" })
        }
    },
    createUser: async (req, res) => {

        try {
            const { Name, email, password, location } = req.body;
            const imgurl = req.body;

            if (Name && email && password && imgurl && location) {
                const hashpass = await bcrypt.hash(password, 10)
                const result = await Register.findOne({ email: email });
                if (result == null) {
                    const userDoc = new Register({ Name: Name, email: email, password: hashpass, imgurl: req.url, location: location })
                    await userDoc.save()
                    return res.json({ success: "true", msg: "user registered successfully.." });
                }
                else {
                    return res.json({ status: "failed", msg: "User already exists.." });
                }
            } else {
                return res.json({ status: "failed", msg: "All fields are required.." });
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }
    },
    Login: async (req, res) => {
        try {
            const { email, password } = req.body;   //destructuring
            if (email && password) {
                const result = await Register.findOne({ email: email });
                if (result != null) {
                    const isMatch = await bcrypt.compare(password, result.password)
                    if ((result.email == email) && isMatch) {
                        const token = jwt.sign({ userID: result._id }, process.env.jwt_secret_key, { expiresIn: '2h' })
                        return res.json({ status: "success", msg: "login successfull..", token: token });
                    }
                    else {
                        return res.json({ status: "failed", msg: "invalid password.." });
                    }
                }
                else {
                    return res.json({ status: "failed", msg: "user does not exist.." });
                }
            } else {
                return res.json({ status: "failed", msg: "All fields are required.." });
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }
    },
    forgotPass: async (req, res) => {
        try {
            const { email } = req.body
            if (email) {
                const user = await Register.findOne({ email })
                if (!user) return res.json({ status: "failed", msg: "This email does not exist." })
                sendEmail({
                    to: email,
                    subject: "Password Reset Request",
                    html: `<h2>please click on the below link to reset your password</h2>
                        http://localhost:4000/user/reset_password?email=${email}`
                });
                res.json({ "msg": "Email message send" })
            } else {
                return res.json({ status: "failed", msg: "emailID is required.." })
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }

    },
    resetPass: async (req, res) => {
        try {
            const { email } = req.query;
            const { newpass, renewpass } = req.body;
            if (email && newpass && renewpass) {
                if (newpass == renewpass) {
                    const hashpass = await bcrypt.hash(newpass, 10)
                    await Register.updateOne({ email: email }, { $set: { password: hashpass } })
                    return res.json({ msg: "Password updated successfully.." })
                }
                else {
                    return res.json({ msg: "new password and confirm new password are not matched.." })
                }
            } else {
                return res.json({ status: "failed", msg: "All fields are required.." })
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { Name, email, location } = req.body;

            if (Name || email || location) {
                await Register.updateOne({ email: email }, { $set: { Name: Name, email: email, location: location } })
                return res.json({ status: "success", msg: "Profile Updated Successfully.." })
            } {
                return res.json({ status: "failed", msg: "All fields are required.." })
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { email } = req.body;
            if (email) {
                await Register.deleteOne({ email: email });
                return res.json({ msg: "User  Successfully Deleted.." });
            } else {
                return res.json({ status: "failed", msg: "ID is required.." })
            }
        } catch (err) {
            return res.json({ status: "failed", msg: err.message });
        }
    },
}


