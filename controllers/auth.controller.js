import User from "../models/User";
// register, login, logout,refreshAcessToken

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
  } catch (error) {
    console.log("Error signing up");
    res.status(500).json({
      success: false,
      message: "Some error occured",
      error,
    });
  }
};
export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error signing up");
    res.status(500).json({
      success: false,
      message: "Some error occured",
      error,
    });
  }
};
export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error signing up");
    res.status(500).json({
      success: false,
      message: "Some error occured",
      error,
    });
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error signing up");
    res.status(500).json({
      success: false,
      message: "Some error occured",
      error,
    });
  }
};
