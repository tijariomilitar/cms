const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const User = require('../app/model/user');

const db = require('./connection');

passport.serializeUser(async (user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    // if(user.access == 'ctm'){let user = await Customer.findById(user.id);} else {let user = await User.findById(user.id);};
    
    let serializedUser = await User.findById(user.id);
    done(null, serializedUser[0]);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, username, password, done) => {
        console.log('req');
        console.log(req.body);
        return done(null, false, req.flash('signupMessage', 'Ocorreu um erro ao cadastrar o colaborador!'));

        let user = await User.findByusername(req.body.username);

        if(!req.body.name){
            return done(null, false, req.flash('signupMessage', 'É necessário preencher todos os campos.'));
        }

        if(user.length) {
            return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
        } else {
            if(req.body.password !== req.body.confirmPassword){
                return done(null, false, req.flash('signupMessage', 'Senhas Não correspondem.'));
            } else {
                let user = new User();
                user.name = req.body.name;
                user.username = req.body.username;
                user.username = req.body.username;
                user.password = bcrypt.hashSync(req.body.password, null, null);

                try {
                    await user.save();
                    return done(null, false, req.flash('signupMessage', 'Colaborador(a) '+user.name+' cadastrado(a) com sucesso!'));
                } catch (err) {
                    console.log(err);
                    return done(null, false, req.flash('signupMessage', 'Ocorreu um erro ao cadastrar o colaborador!'));
                }
            }
        }
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, username, password, done) => {
        let user = await User.findByusername(req.body.username);

        if (!user.length){
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
        }

        if(user.length){
            if (!bcrypt.compareSync(password, user[0].password)){
                return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
            }
            return done(null, user[0]);
        }
    })
);

module.exports = passport;