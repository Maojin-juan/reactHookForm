import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";

const CheckboxRadio = ({
  id,
  name,
  labelText,
  type,
  rules,
  register,
  errors,
  value,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        {...register(name, rules)}
        className={
          errors[name] && type === "radio"
            ? "size-[13px] appearance-none rounded-full border border-red-600"
            : "size-[13px] appearance-none rounded-[1px] border border-red-600"
        }
      />
      <label htmlFor={id} className={errors[name] && "text-red-600"}>
        {labelText}
      </label>
      {errors[name] && (
        <div className="text-sm text-red-600">{errors[name]?.message}</div>
      )}
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
        <div className="text-sm text-red-600">{errors[id]?.message}</div>
      )}
    </>
  );
};

const Select = ({
  id,
  labelText,
  rules,
  register,
  errors,
  disabled,
  children,
}) => {
  return (
    <>
      <label htmlFor={id} className="mb-4">
        {labelText}
      </label>
      <select
        className={`${errors[id] && "border-red-600"} rounded-md border p-2`}
        id={id}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="text-sm text-red-600">{errors[id]?.message}</div>
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
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
  };

  const [addressData, setAddressData] = useState([]);

  const watchForm = useWatch({
    control,
  });

  useEffect(() => {
    // console.log(getValues());
    // console.log("errors", errors);
    // 或是使用 setValues 寫入值
  }, [watchForm]); // 將新變數傳入

  useEffect(() => {
    (async () => {
      const result = await axios.get("/src/assets/taiwan.json");
      console.log(result);
      setAddressData(result.data);
    })();
  }, []);

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              {addressData.map((city) => {
                return (
                  <option value={city.CityName} key={city.CityEngName}>
                    {city.CityName}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="flex w-full flex-col">
            <Select
              id="district"
              labelText="鄉鎮市區"
              errors={errors}
              rules={{ required: "鄉鎮為必填" }}
              register={register}
              disabled={!getValues().city}
            >
              <option value="">請選擇鄉鎮市區</option>
              {addressData
                .find((city) => city.CityName === getValues().city)
                ?.AreaList?.map((area) => {
                  return (
                    <option value={area} key={area.AreaName}>
                      {area.AreaName}
                    </option>
                  );
                })}
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
            name="isVegetarian"
            type="radio"
            labelText="是"
            value={true}
            errors={errors}
            rules={{ required: "請選擇是否吃素" }}
            register={register}
          ></CheckboxRadio>
          <CheckboxRadio
            id="vegetarian"
            name="nonVegetarian"
            type="radio"
            labelText="否"
            value={false}
            errors={errors}
            rules={{ required: "請選擇是否吃素" }}
            register={register}
          ></CheckboxRadio>
        </div>

        <div className="flex flex-col">
          <CheckboxRadio
            id="isCheckForm"
            name="isCheckForm"
            type="checkbox"
            labelText="確認同意本文件"
            errors={errors}
            rules={{ required: true }}
            register={register}
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
