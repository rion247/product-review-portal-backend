/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { UserStatus, type UserRole } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { JwtPayload, Secret } from 'jsonwebtoken';
import { JwtHelpers } from '../../helpers/jwtHelper';
import catchAsync from '../../shared/catchAsync';
import prisma from '../../shared/prisma';
import config from '../config';
import APIError from '../errors/APIError';
import { isUserPasswordIssuedBeforeJWTToken } from '../modules/Auth/auth.utils';

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new APIError(
        StatusCodes.UNAUTHORIZED,
        'Sorry! You are not authorized!!!',
      );
    }

    let decoded;

    try {
      decoded = JwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret,
      ) as JwtPayload;
    } catch (err) {
      throw new APIError(
        StatusCodes.UNAUTHORIZED,
        'Sorry! You are not authorized!!!',
      );
    }

    const { email, role, iat } = decoded;

    const userData = await prisma.authentication.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      throw new APIError(StatusCodes.NOT_FOUND, 'Sorry! User not found!!!');
    }

    const userStatus = userData?.status;

    if (userStatus === UserStatus.BLOCKED) {
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        'Sorry! This user is already blocked!!!',
      );
    }

    if (
      userData?.passwordChangedAt &&
      isUserPasswordIssuedBeforeJWTToken(
        userData?.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new APIError(
        StatusCodes.UNAUTHORIZED,
        'Sorry! You are not authorized!!!',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      (StatusCodes.UNAUTHORIZED, 'Sorry! You are not authorized!!!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
