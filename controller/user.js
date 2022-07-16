const User=require('../model/user');
const bcrypt=require('bcryptjs');

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('signup', { title: 'Sign up', path: '/signup', errorMessage: message })
}
exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const passWord = req.body.password;
    const confirmPassWord = req.body.cpassword;
    console.log(passWord, confirmPassWord);
    if (passWord === confirmPassWord) {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            try {
                let hashPassword = await bcrypt.hash(passWord, 12);
                const user = new User({
                    email: email,
                    password: hashPassword,
                    role: 'user'
                });
                const result = await user.save();
                console.log(result)
                req.session.isLoggedIn = true
                req.session.user = user;
                return req.session.save((err) => {
                    console.log(err);
                    res.redirect('/');
                })
            } catch (err) {
                res.render('error', { error: err, title: 'Error Page', path: '/error' })
            }
        } else {
            req.flash('error', 'Email already taken')
            res.redirect('/signup');
        }

    } else {
        req.flash('error', 'Password Mismatch')
        res.redirect('/signup');
    }

}
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('login',
        {
            title: 'Login',
            path: '/login',
            errorMessage: message,
            isValid: req.session.isLoggedIn
        })
}
exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error', 'Invalid E-mail or Password');
            return res.redirect('/login');
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
                res.redirect(req.session.returnTo || '/');

            })
        }
        req.flash('error', 'Invalid E-mail or Password');
        res.redirect('/login')
    } catch (err) {
        res.redirect('/login');
    }
}
exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
}