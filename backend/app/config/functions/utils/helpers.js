export const getBaseURL = () => {
  return `${process.env.NEXT_SBB_PUBLIC_URL || "http://localhost:3000"}${path}`;
};

module.exports = { getBaseURL };
