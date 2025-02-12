import React from 'react'

const AddCategory = () => {
  return (
    <div className="add-product-container flex flex-col rg-20 align-center justify-center py-20">
      <h1 className="text-primary">ADD CATEGORY</h1>
      <form>
        <div className="input-field flex flex-col rg-10">
          <label>Select Image</label>
          <input type="file" name="image" id="select_file"/>
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Category Name</label>
          <input
            type="text"
            name="categ_name"
          />
        </div>
      </form>
    </div>
  )
}

export default AddCategory
