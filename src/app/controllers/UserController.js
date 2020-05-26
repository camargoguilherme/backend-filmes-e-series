import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      fullname: Yup.string().required(),
      isAdmin: Yup.bool(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const userExists = await User.findOne({email: req.body.email});
    if (userExists) {
      return res.status(400).json({error: 'User already exists.'});
    }

    const userLoged = await User.findById(req.userId);
    if (userLoged) {
      req.body.isAdmin = userLoged.isAdmin && req.body.isAdmin;
    }

    const {id, username, fullname, email} = await User.create(req.body);
    return res.json({
      id,
      username,
      fullname,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation falis'});
    }
    const {email, oldPassword} = req.body;
    const user = await User.findById(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({email: req.body.email});
      if (userExists) {
        return res.status(400).json({error: 'User already exists.'});
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({error: 'Password does not match'});
    }

    await user.update(req.body);
    const {id, name, avatar} = await User.findByPk(req.userId);
    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
