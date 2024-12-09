import {} from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const Input = ({ id, labelText, type, errors, register, rules }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2" htmlFor={id}>
        {labelText}
      </label>
      <input
        id={id}
        className={`${errors[id] && "border-red-600"} rounded-md border p-1`}
        type={type}
        {...register(id, rules)}
      />
      {errors[id] && <div className="text-red-600">{errors[id]?.message}</div>}
    </div>
  );
};

const Select = ({ id, labelText, errors, register, rules, children }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-2" htmlFor={id}>
        {labelText}
      </label>
      <select
        id={id}
        className={`${errors[id] && "border-red-600"} rounded-md border p-1`}
        {...register(id, rules)}
      >
        {children}
      </select>
      {errors[id] && <div className="text-red-600">{errors[id]?.message}</div>}
    </div>
  );
};

const CheckboxRadio = ({ id, name, labelText, type }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        className="rounded-md border border-gray-400 p-1"
        id={id}
        name={name}
        type={type}
      ></input>
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

const FieldPropTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};

Input.propTypes = {
  ...FieldPropTypes,
};

Select.propTypes = {
  ...FieldPropTypes,
};

CheckboxRadio.propTypes = {
  ...FieldPropTypes,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function App() {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  return (
    <form className="flex flex-col gap-4">
      <Input
        id="userName"
        labelText="使用者名稱"
        type="text"
        errors={errors}
        rules={{ required: "使用者名稱為必填" }}
        register={register}
      ></Input>

      <Input
        id="email"
        labelText="Email"
        type="email"
        errors={errors}
        rules={{ required: "Email為必填" }}
        register={register}
      ></Input>

      <Input
        id="tel"
        labelText="電話"
        type="tel"
        errors={errors}
        rules={{ required: "電話為必填" }}
        register={register}
      ></Input>

      <div className="flex justify-between space-x-4">
        <Select
          id="city"
          labelText="縣市"
          errors={errors}
          register={register}
          rules={{ required: "縣市為必填" }}
        >
          <option value="">請選擇縣市</option>
        </Select>
        <Select
          id="district"
          labelText="鄉鎮市區"
          errors={errors}
          register={register}
          rules={{ required: "鄉鎮市區為必填" }}
        >
          <option value="">請選擇鄉鎮市區</option>
        </Select>
      </div>

      <Input
        id="address"
        labelText="地址"
        type="address"
        errors={errors}
        rules={{ required: "地址為必填" }}
        register={register}
      ></Input>

      <div className="flex flex-col">
        <label className="mb-2" htmlFor="vegetarian">
          素食者
        </label>
        <CheckboxRadio
          id="isVegetarian"
          name="vegetarian"
          labelText="是"
          type="radio"
        ></CheckboxRadio>
        <CheckboxRadio
          id="nonVegetarian"
          name="vegetarian"
          labelText="否"
          type="radio"
        ></CheckboxRadio>
      </div>

      <CheckboxRadio
        id="isValid"
        name="isValid"
        labelText="確認同意本文件"
        type="checkbox"
      ></CheckboxRadio>

      <button>註冊</button>
    </form>
  );
}

export default App;
