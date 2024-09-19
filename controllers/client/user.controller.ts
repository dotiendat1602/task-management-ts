import User from "../../models/user.model";
import { Request, Response } from "express";
import md5 from "md5";
import * as generateHelper from  "../../helpers/generate.helper";

// [POST] /users/register
export const register = async (req: Request, res: Response) => {
    try {
        const existUser = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        if(existUser) {
            res.json({
                code: 400,
                message: "Email đã tồn tại!"
            });
            return;
        }

        const token = generateHelper.generateRandomString(30);

        const dataUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            token: token,
        };

        const user = new User(dataUser);
        await user.save();

        res.json({
            code: 200,
            message: "Đăng ký thành công!",
            token: token
        });
    } catch (error) {
        res.json({
            message: "Not Found"
        });
    }
}

// [POST] /users/login
export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }

    if(md5(password) != user.password){
        res.json({
            code: 400,
            message: "Sai mật khẩu!"
        });
        return;
    }

    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: user.token
    });
}

// [GET] /users/profile
export const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            token: req["tokenVerify"],
            deleted: false
        }).select("-password -token");
    
        res.json({
            code: 200,
            message: "Thành công!",
            user: user
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không hợp lệ!"
        });
    }
}