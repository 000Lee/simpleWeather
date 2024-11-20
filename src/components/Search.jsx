import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const Search = ({ koreanCities, selectedCity, onCityChange }) => {
   return (
      <div className="search">
         <Autocomplete
            options={koreanCities} // 도시 목록
            getOptionLabel={(option) => option.korean} // 한글 이름 표시
            value={selectedCity} // 현재 선택된 도시
            onChange={onCityChange} // 선택 시 호출
            disableClearable
            renderInput={(params) => <TextField {...params} label="도시를 클릭하세요" variant="outlined" sx={{ width: 300 }} />}
         />
      </div>
   )
}

export default Search
