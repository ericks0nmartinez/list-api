export const getVersion = (req, res) => {
    const version = {
        version: "1.0.0",
        description: "Initial project list-api",
        autor: "erickson martinez",
    };
    res.json(version);
};
