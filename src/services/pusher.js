// src/services/pusher.js

import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    encrypted: true,
});

export const subscribeToGame = (gameId, eventCallback) => {
    const channel = pusher.subscribe(`game-${gameId}`);
    channel.bind('game-update', eventCallback);
    return () => {
        channel.unbind('game-update', eventCallback);
        pusher.unsubscribe(`game-${gameId}`);
    };
};

export const subscribeToLobby = (eventCallback) => {
    const channel = pusher.subscribe('lobby');
    channel.bind('lobby-update', eventCallback);
    return () => {
        channel.unbind('lobby-update', eventCallback);
        pusher.unsubscribe('lobby');
    };
};