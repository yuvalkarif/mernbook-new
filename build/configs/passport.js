"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user"));

var _passportLocal = require("passport-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var passportSetup = passport => {
  passport.use(new _passportLocal.Strategy( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (username, password, done) {
      var user;
      var result;

      try {
        user = yield _user.default.findOne({
          username: username
        });
        if (!user) return done(null, false);
        result = yield _bcrypt.default.compare(password, user.password);

        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        throw err;
      }
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (id, done) {
      _user.default.findOne({
        _id: id
      }, (err, user) => {
        done(err, user);
      });
    });

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var _default = passportSetup;
exports.default = _default;
//# sourceMappingURL=passport.js.map