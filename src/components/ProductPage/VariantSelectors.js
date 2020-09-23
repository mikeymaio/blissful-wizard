import React from 'react' /* eslint-disable */

const VariantSelector = ({ key, onChange, options, disabled }) => {
  if (options.name === 'Title') return null

  // console.log('key: ', key)
  // console.log('onChange: ', onChange)
  // console.log('options: ', options)

  return (
    <div className="field ">
      <label className="label">{options.name} </label>

      <div className="control">
        <div className="select is-fullwidth">
          <select
            onChange={onChange}
            name={options.name}
            key={options.id}
            disabled={disabled}
          >
            {options.values.map(value => (
              <option
                key={`${options.name}-${value}`}
                value={value}
                className="is-medium"
              >
                {`${value}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default VariantSelector
