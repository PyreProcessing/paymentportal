import React from "react";
import { Divider, Form, Input, InputNumber, Select } from "antd";
import styles from "./index.module.scss";
import formStyles from "@/styles/form.module.scss";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { countries } from "@/data/countries";
import CartList from "@/components/cartList/CartList.component";
import { useCartStore } from "@/state/cart";

const PaymentInformation = () => {
  const [form] = Form.useForm();

  const { currentForm, setCurrentForm, paymentInformationValues } = useCartStore();

  React.useEffect(() => {
    form.setFieldsValue(paymentInformationValues);
    setCurrentForm(form);
  }, [form]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
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
              <Form.Item
                label="Email"
                name="email"
                className={formStyles.form__label}
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input placeholder="youremail@example.com" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value: any) => formatPhoneNumber(value)}
                  parser={(value: any) => value.replace(/[^\d]/g, "")}
                  controls={false}
                  placeholder="123-456-7890"
                />
              </Form.Item>
            </div>
          </div>
          <Divider orientation="center">Billing Information</Divider>

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
      <div className={styles.cartContainer}>
        <CartList />
      </div>
    </div>
  );
};

export default PaymentInformation;
