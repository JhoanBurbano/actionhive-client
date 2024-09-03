import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import './Multiselect.style.scss'

interface Option {
  value: string;
  label: string;
}

interface MultiselectProps {
    options: Option[],
    placeholder: string,
    onChange: (selected: string[])=>void,
    initialValue?: string[] 
}


const Multiselect: React.FC<MultiselectProps> = ({options, placeholder, onChange, initialValue}) => {
  const [selectedOption, setSelectedOption] = useState<Option[] | null>(null);

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOption(selected as Option[]);
    onChange((selected as Option[]).map((option) => option.value))
  };

  useEffect(() => {
    if (initialValue?.length) {
      console.log('initialValue :>> ', initialValue, options.filter((option) => initialValue.includes(option.value)));
      setSelectedOption(options.filter((option) => initialValue.includes(option.value)));
    }
  }, []);

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        value={selectedOption}
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