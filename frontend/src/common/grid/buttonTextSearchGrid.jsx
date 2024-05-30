import React from 'react';
import Button from '../form/button';

const ButtonTextSearchGrid = props => {
    let className = props.className ?? 'primary';
    return (
        <>
            <Button
                type='button'
                className={className + ' btn_search_grid'}
                icon={props.icon ?? 'search'}
                onClick={props.onBtnClick}
                disabled={(props.readOnly !== undefined) ? props.readOnly : false}
                label={props.label ?? ''}
            />
        </>
    )
}

export default ButtonTextSearchGrid;