import React, { useState } from 'react';

// Initialize a ref inside a custom hook
export const useUserState = () => {
    return useState(null);
};

// Alternatively, you can initialize the ref inside a functional component
export const SharedRefProvider = () => {
    const sharedRef = useRef(null);
    return sharedRef;
};