import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import "./OrderForm.css";
import * as Yup from "yup";
//
//
//
//
//
//
export default function OrderForm() {
  // sabit, sayfayla birlikte kayıtlı kalacak olan seçimler // checkboxes

  const [extras, setExtras] = useState([
    "pepperoni",
    "sosis",
    "mısır",
    "ananas",
    "jalepeno",
  ]);

  function extrasHandleChange(event) {
    let newExtras;
    const value = event.target.value;
    if (extras.includes(value)) {
      newExtras = extras.filter((extras) => extras !== value);
      // extra içeriyor mu
    } else {
      newExtras = [...extras, value];
      // extra içermiyorsa
    }
    setExtras(newExtras);
  }
  // console.log("array click control:",extras);
  //
  //
  //
  //
  // isim & adres için yup kısmı

  const sema = Yup.object().shape({
    name: Yup.string()
      .required("adres ve isim gerekli")
      .min(4, "en az 4 karakter olmalı"),
  });

  const [formData, setFormData] = useState({ name: "" });

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
  });

  function addressHandleChange(e) {
    Yup.reach(sema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  // console.log(errors.name);

  // sipariş ver validation

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    sema.isValid(formData).then((valid) => {
      setFormValid(valid);
    });
  }, [formData]);

  return (
    <div>
      <Header />

      {/* NAV SECTION: */}
      <div>
        <div className="links">
          <ul>
            <NavLink to="/" exact activeClassName="link-color">
              Anasayfa
            </NavLink>

            <span>-</span>

            <NavLink to="/pizza" activeClassName="link-color">
              Seçenekler
            </NavLink>

            <span>-</span>

            <NavLink to="/siparisonayi" activeClassName="link-color">
              Siparişi Oluştur
            </NavLink>
          </ul>
        </div>

        {/* PRODUCT INDEX TOPIC: */}

        <div className="product-order">
          <div className="forms">
            <br />
            <div className="prd-name">
              <h3>Position Absolute Acı Pizza</h3>
            </div>
            <br />
            <div className="prd-count">
              <h3>100 ₺</h3>
              <p>4.9</p>
              <p>(200)</p>
            </div>
            <br />
            <div className="prd-prg">
              <p>
                Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
                acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
                çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel
                olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
                genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
                oluşan İtalyan kökenli lezzetli bir yemektir..Küçük bir pizzaya
                bazen pizzetta denir.
              </p>
            </div>

            {/* FORM:  */}

            <form id="pizza-form">
              {/* CHOISE YOUR OWN PIZZA: */}

              <div className="form-first-part">
                <div className="options-one">
                  <div className="p_size">
                    <h4>
                      Boyut Seçin <span className="spancolor">*</span>
                    </h4>

                    <label htmlFor="small" className="radios">
                      <input
                        type="radio"
                        id="small"
                        name="size"
                        value="small"
                      />
                      Small
                    </label>
                    <br />

                    <label htmlFor="medium" className="radios">
                      <input
                        type="radio"
                        id="medium"
                        name="size"
                        value="medium"
                      />
                      Medium
                    </label>
                    <br />

                    <label htmlFor="large" className="radios">
                      <input
                        type="radio"
                        id="large"
                        name="size"
                        value="large"
                      />
                      Large
                    </label>
                    <br />
                  </div>
                  <div className="p_weight">
                    <h4>
                      Hamur Seçin <span className="spancolor">*</span>
                    </h4>

                    <select
                      id="size-dropdown"
                      name="thickness"
                      defaultValue="none"
                    >
                      <option value="none" disabled>
                        Hamur Kalınlığı:
                      </option>
                      <option type="option" value="thin">
                        Thin
                      </option>
                      <option type="option" value="normal">
                        Normal
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/*  CHECKBOX - LİST: */}
              <div className="form-sec-part">
                <div className="options-two">
                  <div>
                    <h4>Ek Malzemeler</h4>
                    <p>
                      En fazla 10 malzeme seçebilirsiniz. Malzeme başına
                      eklenecek fiyat 5₺'dir.
                    </p>
                  </div>
                  <div className="checkboxes">
                    <label>
                      <input
                        type="checkbox"
                        value="pepperoni"
                        name="extras"
                        checked={extras.includes("pepperoni")}
                        onChange={extrasHandleChange}
                      />
                      Pepperoni
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="domates"
                        name="extras"
                        checked={extras.includes("domates")}
                        onChange={extrasHandleChange}
                      />
                      Domates
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="biber"
                        name="extras"
                        checked={extras.includes("biber")}
                        onChange={extrasHandleChange}
                      />
                      Biber
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sosis"
                        name="extras"
                        checked={extras.includes("sosis")}
                        onChange={extrasHandleChange}
                      />
                      Sosis
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="mısır"
                        name="extras"
                        checked={extras.includes("mısır")}
                        onChange={extrasHandleChange}
                      />
                      Mısır
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sucuk"
                        name="extras"
                        checked={extras.includes("sucuk")}
                        onChange={extrasHandleChange}
                      />
                      Sucuk
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="kanada jambonu"
                        name="extras"
                        checked={extras.includes("kanada jambonu")}
                        onChange={extrasHandleChange}
                      />
                      Kanada Jambonu
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="salam"
                        name="extras"
                        checked={extras.includes("salam")}
                        onChange={extrasHandleChange}
                      />
                      Salam
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="ananas"
                        name="extras"
                        checked={extras.includes("ananas")}
                        onChange={extrasHandleChange}
                      />
                      Ananas
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="tavuk ızgara"
                        name="extras"
                        checked={extras.includes("tavuk ızgara")}
                        onChange={extrasHandleChange}
                      />
                      Tavuk Izgara
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="jalepeno"
                        name="extras"
                        checked={extras.includes("jalepeno")}
                        onChange={extrasHandleChange}
                      />
                      Jalepeno
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="kabak"
                        name="extras"
                        checked={extras.includes("kabak")}
                        onChange={extrasHandleChange}
                      />
                      Kabak
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="soğan"
                        name="extras"
                        checked={extras.includes("soğan")}
                        onChange={extrasHandleChange}
                      />
                      Soğan
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="sarımsak"
                        name="extras"
                        checked={extras.includes("sarımsak")}
                        onChange={extrasHandleChange}
                      />
                      Sarımsak
                    </label>
                  </div>
                </div>
              </div>

              {/* ORDER NOTES & NAME ADDRESS */}

              <div className="form-th-part">
                <label htmlFor="note" className="note">
                  <h4>Sipariş Notu</h4>
                  <input
                    type="text"
                    id="text-inputs"
                    onChange={addressHandleChange}
                    value={formData.name}
                    placeholder="Siparişine eklemek istediğin bir not var mı?"
                  />
                </label>
                <br />
                <span className="form-errors">{errors.name}</span>
              </div>

              {/* ORDER BUTTON & SUMMARY: */}

              <div className="form-ftrh-part">
                <label htmlFor="name-input" className="order-info">
                  <h4>İsim & Adres Bilgisi:</h4>
                </label>
                <textarea
                  type="text"
                  id="text-inputs"
                  onChange={addressHandleChange}
                  //value={formData.name}
                  placeholder="please type your name and address"
                ></textarea>
                <br />
                <span className="form-errors">{errors.name}</span>
                <br />
                <div>
                  <h5>Sipariş Toplamı</h5>
                  <div>
                    <h6>Ekstra Seçimler</h6>
                    <h6>15 .₺</h6>
                  </div>
                  <div>
                    <h6>Toplam</h6>
                    <h3>100 .₺</h3>
                  </div>
                </div>
                <button
                  type="submit"
                  id="order-button"
                  // şimdilik reset checkbox buttonu,değiştireceğim
                  // onClick={() => setExtras([])}
                  // bu buton adres ve isim bilgisi 4 karakterden büyükse aktif oluyor, şimdilik.
                  disabled={!isFormValid}
                >
                  Sipariş ver
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
