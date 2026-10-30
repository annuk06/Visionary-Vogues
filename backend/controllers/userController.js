import User from "../models/User.js";

// Demo endpoint: in a real deployment this reads the authenticated user
// from a session/JWT. Kept minimal here since the brief treats accounts as
// optional ("Do not force users to provide sensitive personal information").
export async function getProfile(req, res, next) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.json({ profile: null });
    }
    const user = await User.findById(userId);
    res.json({ profile: user });
  } catch (err) {
    next(err);
  }
}
