module.exports = (mongoose) => {
    const User = mongoose.model(
        "User",
        mongoose.Schema(
            {
                username: String,
                email: String,
                password: String,
                currency: String
            },
            { timestamps: true }
        )
    );

    return User;
};