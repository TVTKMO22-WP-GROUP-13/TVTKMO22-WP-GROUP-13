//oli pakko tehä kun debug oli tuskaa
const ok = (res, data) => res.status(200).json(data);
const error = (res, message = "Internal server error") => res.status(500).json({ message });

module.exports = { ok, error };