export const validateSignup = (req, res, next) => {
  const { fullName, email, password } = req.body;

  const errors = [];

  if (!fullName || fullName.trim() === "") {
    errors.push("Full name is required");
  }

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateMessage = (req, res, next) => {
  const { text, image } = req.body;

  if (!text && !image) {
    return res.status(400).json({ message: "Text or image is required" });
  }

  if (text && text.length > 2000) {
    return res.status(400).json({ message: "Message text is too long (max 2000 characters)" });
  }

  next();
};
