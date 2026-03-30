
export const ORIENTATION = {
    /**
     * Towards positive x and positive y.
     */
    NORTH_EAST: 'NE',
    /**
     * Towards negative x and positive y.
     */
    NORTH_WEST: 'NW',
    /**
     * Towards positive x and negative y.
     */
    SOUTH_EAST: 'SE',
    /**
     * Towards negative x and negative y.
     */
    SOUTH_WEST: 'SW'
}

export const GRANULAR_ORIENTATION = {
    /**
     * Towards positive x.
     */
    EAST: 'E',
    /**
     * Towards positive y.
     */
    NORTH: 'N',
    /**
     * Towards positive x and positive y.
     */
    NORTH_EAST: 'NE',
    /**
     * Towards negative x and positive y.
     */
    NORTH_WEST: 'NW',
    /**
     * Towards negative y.
     */
    SOUTH: 'S',
    /**
     * Towards positive x and negative y.
     */
    SOUTH_EAST: 'SE',
    /**
     * Towards negative x and negative y.
     */
    SOUTH_WEST: 'SW',
    /**
     * Towards negative x.
     */
    WEST: 'W'
}

export const relativeOrientation = (fromX, fromY, toX, toY) => {
    if (toX - fromX > 0) {

    }
}


export const relativeGranularOrientation = (fromX, fromY, toX, toY, speed) => {
    if (toX + (speed / 2) < fromX) {
        if (toY + (speed / 2) < fromY) {
            return GRANULAR_ORIENTATION.SOUTH_WEST;
        } else if (toY - (speed / 2) > fromY) {
            return GRANULAR_ORIENTATION.NORTH_WEST;
        } else {
            return GRANULAR_ORIENTATION.WEST;
        }
    } else if (toX - (speed / 2) > fromX) {
        if (toY + (speed / 2) < fromY) {
            return GRANULAR_ORIENTATION.SOUTH_EAST;
        } else if (toY - (speed / 2) > fromY) {
            return GRANULAR_ORIENTATION.NORTH_EAST;
        } else {
            return GRANULAR_ORIENTATION.EAST;
        }
    } else {
        if (toY + (speed / 2) < fromY) {
            return GRANULAR_ORIENTATION.SOUTH;
        } else if (toY - (speed / 2) > fromY) {
            return GRANULAR_ORIENTATION.NORTH;
        } else {
            return undefined;
        }
    }
}