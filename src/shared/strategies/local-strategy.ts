import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const mockUsers = [
  {
    user_id: 1,
    email: 'uraaru@live.com',
    access_token: 'adsfxvza',
    refresh_token: 'Adsfzcv',
    updated_at: '2024-12-10'
  },
  {
    user_id: 2,
    email: 'kaelnslarien@gmail.com',
    access_token: 'adsfxsdfgbvza',
    refresh_token: 'Adsfzxsw35cv',
    updated_at: '2024-12-10'
  }
];

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // TODO Kysely db implementation
  })
);
