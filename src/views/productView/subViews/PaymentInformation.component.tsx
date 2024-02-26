import { Divider, Form, Input, Select } from "antd";
import React from "react";
import formStyles from "@/styles/form.module.scss";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { countries } from "@/data/countries";

const PaymentInformation = () => {
  const [form] = Form.useForm();
  return (
    <Form
      layout="vertical"
      className={formStyles.form}
      form={form}
      initialValues={{
        country: "United States of America (the)",
      }}
    >
      <Divider orientation="center">Customer Information</Divider>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Email" name="email" className={formStyles.form__label} required>
            <Input value={form.getFieldsValue().firstName} />
          </Form.Item>
        </div>
        <div className={formStyles.form__inputGroup}>
          <Form.Item required label="Phone Number" name="phoneNumber" className={formStyles.form__label}>
            <Input
              value={form.getFieldsValue().phoneNumber}
              // format the phone number
              allowClear
              onChange={(e) => form.setFieldsValue({ ...form, phoneNumber: formatPhoneNumber(e.target.value) })}
            />
          </Form.Item>
        </div>
      </div>
      <Divider orientation="center">Billing Information</Divider>

      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="First Name" name="firstName" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().firstName} />
          </Form.Item>
        </div>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Last Name" name="lastName" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().firstName} />
          </Form.Item>
        </div>
      </div>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Company Name" name="company" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().company} className={formStyles.form__select} />
          </Form.Item>
        </div>
      </div>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Address" name="address" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().address} />
          </Form.Item>
        </div>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="City" name="city" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().firstName} />
          </Form.Item>
        </div>
      </div>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Country" name="country" className={formStyles.form__label}>
            <Select
              value={form.getFieldsValue().country}
              className={formStyles.form__select}
              options={countries.map((country) => {
                return { label: country, value: country };
              })}
            />
          </Form.Item>
        </div>
      </div>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Zip Code" name="zipcode" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().zipcode} />
          </Form.Item>
        </div>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Phone Number" name="phoneNumber" className={formStyles.form__label}>
            <Input value={form.getFieldsValue().phoneNumber} />
          </Form.Item>
        </div>
      </div>
      <div className={formStyles.form__formGroup}>
        <div className={formStyles.form__inputGroup}>
          <Form.Item label="Special Instructions" name="special" className={formStyles.form__label}>
            <Input.TextArea value={form.getFieldsValue().special} />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default PaymentInformation;
