import * as React from 'react';

export const isNaviagtionReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function RootNavigation(name, params) {
    if (isNaviagtionReadyRef.current && navigationRef.current) {
        navigationRef.current?.navigate(name, params);
    }
};

