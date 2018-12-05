/**
 * External Dependencies
 */
const React  = require('react');
const Helmet = require('react-helmet');

const NotFound = () => {
  return (
    <div>
      <Helmet
        title="Page not found" />

      <div className="page-not-found">
        Page not found
      </div>
    </div>
  );
};

module.exports = NotFound;
