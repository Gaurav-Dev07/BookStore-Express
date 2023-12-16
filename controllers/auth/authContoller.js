const Joi = require("joi")
const bcrypt = require("bcrypt")
const User = require("../../models/user")
const { CustomErrorHandler } = require("../../services/customErrorHandler")
const { JwtService } = require("../../services/jwtService")

const registerUser = async (req, res, next) => {

    console.log("register user invoked")
    const registerSchema = Joi.object({
        username: Joi.string().min(4).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        role: Joi.string()
        // 
    })

    const { error } = registerSchema.validate(req.body)

    console.log('error', error)
    if (error) {
        return next(error)
    }

    const { username, email, password, role } = req.body
    let accessToken;
    try {
        const userExists = await User.exists({ email: email })
        console.log("user exists", userExists)

        if (userExists) {
            return next(CustomErrorHandler.alreadyExists('customer already exists'))
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role
        })

        const savedUser = await newUser.save();
        accessToken = await JwtService.sign({ _id: savedUser._id, email: email, username: username })


    } catch (error) {
        console.log("error->", error)
        return next(error)
    }
    return res.status(201).json({ message: 'user registered successfully', accessToken: accessToken })
}

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })

    const { error } = loginSchema.validate(req.body)
    if (error) {
        next(error)
    }

    try {
        const user = await User.findOne({ email: req.body.email })
        console.log('user ---',user)
        if (!user) {
            return next(CustomErrorHandler.userNotFound(`email or password is wrong`))
        }

        const match = bcrypt.compare(req.body.password, user.password);
        if(!match)
            return next(CustomErrorHandler.userNotFound(`wrong email or password`))

        const accessToken = await JwtService.sign({ _id: user._id, email: user.email, username: user.username })
        return res.status(200).json({ message: 'user logged in successfully', accessToken: accessToken })
        
    } catch (error) {
        return next(error)
    }



}

module.exports = {
    registerUser,
    loginUser
}