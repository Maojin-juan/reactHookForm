// import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
// import axios from "axios";

const CheckboxRadio = ({ id, labelText, type }) => {
  return (
    <div className="flex items-center gap-2">
      <input type={type} id={id} />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

const Input = ({ id, labelText, type, rules, register, errors }) => {
  return (
    <>
      <label htmlFor={id} className="mb-4">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={`${errors[id] && "border-red-600"} rounded-md border p-2`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="text-sm text-red-600">{errors?.[id]?.message}</div>
      )}
    </>
  );
};

const Select = ({ id, labelText, rules, register, errors, children }) => {
  return (
    <>
      <label htmlFor={id} className="mb-4">
        {labelText}
      </label>
      <select
        className={`${errors[id] && "border-red-600 text-red-600"} rounded-md border p-2`}
        id={id}
        {...register(id, rules)}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="text-sm text-red-600">{errors?.[id]?.message}</div>
      )}
    </>
  );
};

const FieldPropTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};

CheckboxRadio.propTypes = {
  ...FieldPropTypes,
  type: PropTypes.string.isRequired,
};

Input.propTypes = {
  ...FieldPropTypes,
  type: PropTypes.string.isRequired,
};

Select.propTypes = {
  ...FieldPropTypes,
  children: PropTypes.node,
};

function App() {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <Input
            id="username"
            type="text"
            labelText="使用者名稱"
            errors={errors}
            register={register}
            rules={{
              required: "使用者名稱為必填",
              pattern: {
                value: 10,
                message: "使用者名稱長度不超過10個字",
              },
            }}
          ></Input>
        </div>

        <div className="flex flex-col">
          <Input
            id="email"
            type="email"
            labelText="電子郵件"
            errors={errors}
            register={register}
            rules={{
              required: "Email 為必填",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email 格式不正確",
              },
            }}
          ></Input>
        </div>

        <div className="flex flex-col">
          <Input
            id="tel"
            type="tel"
            labelText="電話"
            errors={errors}
            register={register}
            rules={{
              required: "電話為必填",
              minLength: {
                value: 6,
                message: "電話不少於 6 碼",
              },
              maxLength: {
                value: 12,
                message: "電話不超過 12 碼",
              },
            }}
          ></Input>
        </div>

        <div className="flex justify-between space-x-4">
          <div className="flex w-full flex-col">
            <Select
              id="city"
              labelText="縣市"
              errors={errors}
              rules={{ required: "縣市為必填" }}
              register={register}
            >
              <option value="">請選擇縣市</option>
            </Select>
          </div>
          <div className="flex w-full flex-col">
            <Select
              id="district"
              labelText="鄉鎮市區"
              errors={errors}
              rules={{ required: "鄉鎮為必填" }}
              register={register}
            >
              <option value="">請選擇鄉鎮市區</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col">
          <Input
            id="address"
            type="address"
            labelText="地址"
            errors={errors}
            rules={{ required: "地址為必填" }}
            register={register}
          ></Input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="vegetarian" className="mb-2">
            素食者
          </label>
          <CheckboxRadio
            id="vegetarian"
            type="radio"
            labelText="是"
          ></CheckboxRadio>
          <CheckboxRadio
            id="vegetarian"
            type="radio"
            labelText="否"
          ></CheckboxRadio>
        </div>

        <div className="flex flex-col">
          <CheckboxRadio
            id="isCheckForm"
            type="checkbox"
            labelText="確認同意本文件"
          ></CheckboxRadio>
        </div>

        <div className="flex flex-col">
          <label htmlFor="annotation">註解</label>
          <textarea
            className="rounded-md border p-2"
            rows="3"
            name="annotation"
          ></textarea>
        </div>

        <button type="submit">註冊</button>
      </form>
    </div>
  );
}

export default App;
