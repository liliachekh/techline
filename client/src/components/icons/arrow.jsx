import PropTypes from 'prop-types';

export function Arrow({ height, width, fill }) {
  return (
    <svg width={width} height={height} viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.7071 13.7929C9.0976 14.1834 9.0976 14.8166 8.7071 15.2071C8.3166 15.5976 7.6834 15.5976 7.2929 15.2071L1.5 9.4142C0.719 8.6332 0.719 7.3668 1.5 6.5858L7.2929 0.79289C7.6834 0.40237 8.3166 0.40237 8.7071 0.79289C9.0976 1.18342 9.0976 1.81658 8.7071 2.20711L3.9142 7H18C18.5523 7 19 7.4477 19 8C19 8.5523 18.5523 9 18 9H3.9142L8.7071 13.7929Z"
        fill={fill}
      />
    </svg>
  );
}

Arrow.defaultProps = {
  height: 16,
  width: 19,
  fill: '#202025',
};

Arrow.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string,
};