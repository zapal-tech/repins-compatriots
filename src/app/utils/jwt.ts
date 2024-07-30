import * as jwt from 'jsonwebtoken';

type jwtEncodeProps = {
  data: string | number | object;
};

type jwtDecodeProps = {
  token: string;
};

type jwtDecodeReturn = { data: string | number | object; iat: number; exp: number };

export const jwtEncode = ({ data }: jwtEncodeProps): jwtDecodeProps['token'] => {
  return jwt.sign(
    {
      data,
    },
    process.env.PAYLOAD_SECRET || 'jwt_secret846',
    { expiresIn: 60 * 60 * 24 },
  ) as jwtDecodeProps['token'];
};

export const jwtDecode = ({ token }: jwtDecodeProps): jwtDecodeReturn | null => {
  try {
    return jwt.verify(token, process.env.PAYLOAD_SECRET || 'jwt_secret846') as jwtDecodeReturn;
  } catch (err) {
    return null;
  }
};
