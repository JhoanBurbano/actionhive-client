import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import './Multiselect.style.scss'

interface Option {
  value: string;
  label: string;
}

interface MultiselectProps {
    options: Option[],
    placeholder: string,
    onChange: (selected: MultiValue<Option>)=>void
}


const Multiselect: React.FC<MultiselectProps> = ({options, placeholder, onChange}) => {
  const [selectedOption, setSelectedOption] = useState<Option[] | null>(null);

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOption(selected as Option[]);
    onChange(selected as Option[])
  };

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        isMulti={true}
        className='multiselect-custom'
        placeholder={placeholder}
      />
    </div>
  );
}

export default Multiselect