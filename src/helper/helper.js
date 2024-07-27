import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

/** calculate the number of attempts */
export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

/** calculate earned points */
export function earnPoints_Number(result, answers, point) {
    return result
        .map((element, i) => answers[i] === element)
        .filter(i => i)
        .map(i => point)
        .reduce((prev, curr) => prev + curr, 0);
}

/** flag result based on earned points */
export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}

/** check user auth */
export function CheckUserExist({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const auth = useSelector(state => state.result.userId);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get('http://localhost:8082/users/verifyToken', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Token verification failed:', error.response ? error.response.data : error.message);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (accessToken) {
            verifyToken();
        } else {
            setIsLoading(false);
        }
    }, [accessToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return auth && isAuthenticated ? children : <Navigate to={'/login'} replace={true} />;
}

/** get server data */
export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}
