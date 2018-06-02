import {Button} from 'reactstrap';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {typesPriorities} from '../../helpers/const';

import './index.css';

const {func, number} = PropTypes;

const Filter = ({filter, filterState}) => {
    return (
        <footer className="filter">
            <Button onClick={() => filter(null)} key='3' outline={filterState !== null && true} color="secondary"
                    size="sm">Все</Button>
            {typesPriorities.map(type => {
                return (<Button onClick={() => filter(type.id)} key={type.id} outline={filterState !== type.id && true}
                                color="secondary" size="sm">{type.name}</Button>)
            })}
        </footer>
    );
};

Filter.propTypes = {
    filter: func,
    filterState: number,
};

const mapState = state => ({
    filterState: state.filterState,
});
const mapDispatch = ({
                         filterState: {filter},
                     }) => ({
    filter: (id) => filter(id),
});

export default connect(mapState, mapDispatch)(Filter);
