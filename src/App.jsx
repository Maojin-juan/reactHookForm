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
        className="rounded-md border border-gray-400 p-1"
        type={type}
        // {...register(id, rules)}
        // rules={rules}
      />
      {errors[id] && <div>{errors[id]?.message}</div>}
    </div>
  );
};

const Select = ({ id, labelText, children }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-2" htmlFor={id}>
        {labelText}
      </label>
      <select className="rounded-md border border-gray-400 p-1" id={id}>
        {children}
      </select>
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
        errors={errors}
        rules={{ required: "使用者名稱為必填" }}
      ></Input>

      <Input
        id="email"
        labelText="Email"
        errors={errors}
        rules={{ required: "Email為必填" }}
      ></Input>

      <Input
        id="tel"
        labelText="電話"
        errors={errors}
        rules={{ required: "電話為必填" }}
      ></Input>

      <div className="flex gap-4">
        <Select id="city" labelText="縣市">
          <option value="">請選擇縣市</option>
        </Select>
        <Select id="city" labelText="鄉鎮市區">
          <option value="">請選擇鄉鎮市區</option>
        </Select>
      </div>

      <Input id="address" labelText="地址" errors={errors}></Input>

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
