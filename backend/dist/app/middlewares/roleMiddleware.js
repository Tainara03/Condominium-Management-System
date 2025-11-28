"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permit = void 0;
const permit = (minLevel) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: 'Not authenticated' });
        const level = user.role_level ?? 0;
        if (level >= minLevel)
            return next();
        return res.status(403).json({ message: 'Forbidden' });
    };
};
exports.permit = permit;
//# sourceMappingURL=roleMiddleware.js.map