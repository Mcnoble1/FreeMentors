import * as Session from '../models/sessionModel.js';
import * as User from '../models/userModel.js';

export const createSession = async (req, res) => {
    try {
        if (req.isadmin || req.user.role !== 'user') {
            return res.status(403).json({
                status: 403,
                error: 'You are not allowed to create a session',
            });
        }
        const menteeId = req.user.id;
        const { mentorId, questions } = req.body;
    
        // Check if the mentor and mentee exist
        const mentor = await User.findMentorById(mentorId);
    
        if (!mentor) {
        return res.status(404).json({
            status: 404,
            error: 'Mentor not found',
        });
        }
    
        const session = await Session.createSession({
        mentorId,
        menteeId,
        questions,
        status: 'pending',
        });
    
        res.status(201).json({
        status: 201,
        message: 'Session created successfully',
        data: session,
        });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

export const acceptSession = async (req, res) => {
    try {
        if (req.user.role != 'mentor'){
            return res.status(403).json({
                status: 403,
                error: 'You are not allowed to update a session',
            });
        }
        
        const sessionId = req.params.sessionId
        const currentSession = Session.findSessionById(sessionId)
        const questions = currentSession.questions
        const session = await Session.updateSession(sessionId, {
            questions,
            status: 'accepted'
        })

        res.status(200).json({
            status: 200,
            message: 'Session accepted successfully',
            data: session,
            });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

export const declineSession = async (req, res) => {
    try {
        if (req.user.role != 'mentor'){
            return res.status(403).json({
                status: 403,
                error: 'You are not allowed to update a session',
            });
        }
        
        const sessionId = req.params.sessionId
        const currentSession = Session.findSessionById(sessionId)
        const questions = currentSession.questions
        const session = await Session.updateSession(sessionId, {
            questions,
            status: 'declined'
        })
        res.status(200).json({
            status: 200,
            message: 'Session declined successfully',
            data: session,
            });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

export const getSessions = async (req, res) => {
    try {
        if (req.user.role === 'user'){
            const menteeId = req.user.id;
            const session = Session.findAllMenteeSessions(menteeId)
            res.status(200).json({
                status: 200,
                message: 'Sessions gotten successfully',
                data: session,
                });
        }
        else{
            const mentorId = req.user.id;
            const session = Session.findAllMentorSessions(mentorId)
            res.status(200).json({
                status: 200,
                message: 'Sessions gotten successfully',
                data: session,
                });
        }

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}
