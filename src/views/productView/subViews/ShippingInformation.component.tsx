import React from "react";
import { useCartStore } from "@/state/cart";
import { Checkbox, Divider, Form, Input, Select } from "antd";
import formStyles from "@/styles/Form.module.scss";
import { countries } from "@/data/countries";
import states from "@/data/states";

const ShippingInformation = () => {
  const { userInformationValues, billingInformationValues, shippingInformationValues, setCurrentForm } = useCartStore();
  const [form] = Form.useForm();

  // if the value in 'sameAsShipping' is true, set the form values to the billing information
  React.useEffect(() => {
    if (userInformationValues.sameAsShipping) {
      form.setFieldsValue(billingInformationValues);
    }
    form.setFieldsValue(shippingInformationValues);
    setCurrentForm(form);
  }, [userInformationValues.sameAsShipping, form]);
  return (
    <div>
      <Divider orientation="center">Shipping Information</Divider>
      <Form
        layout="vertical"
        className={formStyles.form}
        form={form}
        initialValues={{
          country: "United States of America (the)",
          // firstName: "testFirstName",
          // lastName: "testLastName",
          // company: "testCompany",
          // address: "testAddress",
          // city: "testCity",
          // zipcode: "testZip",
        }}
      >
        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              label="First Name"
              name="firstName"
              className={formStyles.form__label}
              rules={[{ required: true, message: "Please enter a name for the order" }]}
            >
              <Input value={form.getFieldsValue().firstName} placeholder="John" />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item label="Last Name" name="lastName" className={formStyles.form__label}>
              <Input value={form.getFieldsValue().firstName} placeholder="Doe" />
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
            <Form.Item
              label="Address"
              name="address"
              className={formStyles.form__label}
              rules={[{ required: true, message: "Please enter an address" }]}
            >
              <Input value={form.getFieldsValue().address} />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item
              label="City"
              name="city"
              className={formStyles.form__label}
              rules={[{ required: true, message: "Please enter a city location" }]}
            >
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
          <div className={formStyles.form__inputGroup}>
            <Form.Item label="State" name={["billing", "state"]} className={formStyles.form__label}>
              <Select
                value={form.getFieldsValue().state}
                className={formStyles.form__select}
                options={states.map((state) => {
                  return { label: state.name, value: `${state.name} (${state.abbreviation})` };
                })}
                showSearch
              />
            </Form.Item>
          </div>
          <div className={formStyles.form__inputGroup}>
            <Form.Item label="Zip Code" name="zipcode" className={formStyles.form__label}>
              <Input value={form.getFieldsValue().zipcode} />
            </Form.Item>
          </div>
        </div>
        <div className={formStyles.form__formGroup}>
          <div className={formStyles.form__inputGroup}>
            <Form.Item label="Special Instructions" name="special" className={formStyles.form__label}>
              <Input.TextArea
                value={form.getFieldsValue().special}
                placeholder="Add any special instructions for the order"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ShippingInformation;
