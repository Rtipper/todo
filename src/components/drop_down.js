import { Dropdown, DropdownButton } from 'react-bootstrap';
import { SortContext } from '../context/siteContext.js'
import { useContext } from 'react';


function DropDown(props) {

  // Context
  let { setSort } = useContext(SortContext);

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Sort">
        <Dropdown.Item onClick={() => setSort('all')} >All</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort('completed')} >Completed</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort('incomplete')}>Incomplete</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort('ascending')}>Difficulty (ascending)</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort('descending')}>Difficulty (descending)</Dropdown.Item>
      </DropdownButton>
    </>
  )
}

export default DropDown;