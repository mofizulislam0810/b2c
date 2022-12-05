import React from 'react';

const AdultPerson = () => {
    return (
        <div className="card">
                    <div className="card-body">
                        <div style={{fontSize: 'small'}}>
                           <form>
                                <h5 className="text-warning text-start">Enter traveller details</h5>
                                <div className="row">
                                    <div className="row">
                                        <h5 className="text-start"><span>Adult</span><br/>
                                            <span>1</span>
                                        </h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label float-start" type="">First name</label>
                                            <div className="input-group">
                                                <div className="col-lg-4">
                                                    <select name="" placeholder="Title"
                                                        className="form-control">
                                                        <option defaultValue="Mr"> Mr.</option>
                                                        <option defaultValue="Ms"> Ms.</option>
                                                        <option defaultValue="Mrs"> Mrs.</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-8"><input name="travellers.0.firstName"
                                                        className="form-control" defaultValue=""/></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group"><label className="form-label float-start" type="">Middle name
                                                (Optional)</label><input name="travellers.0.middleName" className="form-control"
                                                defaultValue=""/></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group"><label className="form-label float-start" type="">Last name</label><input
                                                name="travellers.0.lastName" autoComplete="section-traveller-0 family-name"
                                                className="form-control" defaultValue=""/></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-4 mb-2"><label className="fs-6 float-start" type="">Date of
                                            birth</label></div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-check"><input name="travellers.0.birthDateIsHijri"
                                                        type="checkbox" id="travellers.0.birthDateIsHijri"
                                                        className="form-check-input" defaultValue="false"/><label title=""
                                                        type="checkbox" htmlFor="travellers.0.birthDateIsHijri"
                                                        className="form-check-label float-start">Hijri calendar</label></div>
                                            </div>
                                            <div className="col-md-2">
                                                <div defaultValue="NaN" className="sc-cnTzU gYtpQn"><select
                                                        name="travellers.0.birthDateDay" className="form-control">
                                                        <option defaultValue="">Day</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option>12</option>
                                                        <option>13</option>
                                                        <option>14</option>
                                                        <option>15</option>
                                                        <option>16</option>
                                                        <option>17</option>
                                                        <option>18</option>
                                                        <option>19</option>
                                                        <option>20</option>
                                                        <option>21</option>
                                                        <option>22</option>
                                                        <option>23</option>
                                                        <option>24</option>
                                                        <option>25</option>
                                                        <option>26</option>
                                                        <option>27</option>
                                                        <option>28</option>
                                                        <option>29</option>
                                                        <option>30</option>
                                                        <option>31</option>
                                                    </select></div>
                                            </div>
                                            <div className="col-md-3">
                                                <div defaultValue="NaN" className="sc-cnTzU gYtpQn"><select
                                                        name="travellers.0.birthDateMonth" className="form-control">
                                                        <option defaultValue="">Month</option>
                                                        <option defaultValue="0">01 - January</option>
                                                        <option defaultValue="1">02 - February</option>
                                                        <option defaultValue="2">03 - March</option>
                                                        <option defaultValue="3">04 - April</option>
                                                        <option defaultValue="4">05 - May</option>
                                                        <option defaultValue="5">06 - June</option>
                                                        <option defaultValue="6">07 - July</option>
                                                        <option defaultValue="7">08 - August</option>
                                                        <option defaultValue="8">09 - September</option>
                                                        <option defaultValue="9">10 - October</option>
                                                        <option defaultValue="10">11 - November</option>
                                                        <option defaultValue="11">12 - December</option>
                                                    </select></div>
                                            </div>
                                            <div className="col-md-2">
                                                <div defaultValue="NaN" className="sc-cnTzU gYtpQn"><select
                                                        name="travellers.0.birthDateYear" className="form-control">
                                                        <option defaultValue="">Year</option>
                                                        <option>2022</option>
                                                        <option>2021</option>
                                                        <option>2020</option>
                                                        <option>2019</option>
                                                        <option>2018</option>
                                                        <option>2017</option>
                                                        <option>2016</option>
                                                        <option>2015</option>
                                                        <option>2014</option>
                                                        <option>2013</option>
                                                        <option>2012</option>
                                                        <option>2011</option>
                                                        <option>2010</option>
                                                        <option>2009</option>
                                                        <option>2008</option>
                                                        <option>2007</option>
                                                        <option>2006</option>
                                                        <option>2005</option>
                                                        <option>2004</option>
                                                        <option>2003</option>
                                                        <option>2002</option>
                                                        <option>2001</option>
                                                        <option>2000</option>
                                                        <option>1999</option>
                                                        <option>1998</option>
                                                        <option>1997</option>
                                                        <option>1996</option>
                                                        <option>1995</option>
                                                        <option>1994</option>
                                                        <option>1993</option>
                                                        <option>1992</option>
                                                        <option>1991</option>
                                                        <option>1990</option>
                                                        <option>1989</option>
                                                        <option>1988</option>
                                                        <option>1987</option>
                                                        <option>1986</option>
                                                        <option>1985</option>
                                                        <option>1984</option>
                                                        <option>1983</option>
                                                        <option>1982</option>
                                                        <option>1981</option>
                                                        <option>1980</option>
                                                        <option>1979</option>
                                                        <option>1978</option>
                                                        <option>1977</option>
                                                        <option>1976</option>
                                                        <option>1975</option>
                                                        <option>1974</option>
                                                        <option>1973</option>
                                                        <option>1972</option>
                                                        <option>1971</option>
                                                        <option>1970</option>
                                                        <option>1969</option>
                                                        <option>1968</option>
                                                        <option>1967</option>
                                                        <option>1966</option>
                                                        <option>1965</option>
                                                        <option>1964</option>
                                                        <option>1963</option>
                                                        <option>1962</option>
                                                        <option>1961</option>
                                                        <option>1960</option>
                                                        <option>1959</option>
                                                        <option>1958</option>
                                                        <option>1957</option>
                                                        <option>1956</option>
                                                        <option>1955</option>
                                                        <option>1954</option>
                                                        <option>1953</option>
                                                        <option>1952</option>
                                                        <option>1951</option>
                                                        <option>1950</option>
                                                        <option>1949</option>
                                                        <option>1948</option>
                                                        <option>1947</option>
                                                        <option>1946</option>
                                                        <option>1945</option>
                                                        <option>1944</option>
                                                        <option>1943</option>
                                                        <option>1942</option>
                                                        <option>1941</option>
                                                        <option>1940</option>
                                                        <option>1939</option>
                                                        <option>1938</option>
                                                        <option>1937</option>
                                                        <option>1936</option>
                                                        <option>1935</option>
                                                        <option>1934</option>
                                                        <option>1933</option>
                                                        <option>1932</option>
                                                        <option>1931</option>
                                                        <option>1930</option>
                                                        <option>1929</option>
                                                        <option>1928</option>
                                                        <option>1927</option>
                                                        <option>1926</option>
                                                        <option>1925</option>
                                                        <option>1924</option>
                                                        <option>1923</option>
                                                        <option>1922</option>
                                                        <option>1921</option>
                                                        <option>1920</option>
                                                        <option>1919</option>
                                                        <option>1918</option>
                                                        <option>1917</option>
                                                        <option>1916</option>
                                                        <option>1915</option>
                                                        <option>1914</option>
                                                        <option>1913</option>
                                                        <option>1912</option>
                                                    </select></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12"></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"><label className="form-label float-start" type="">Nationality</label>
                                        <div className="col-md-12">
                                            <select name="travellers.0.nationality" className="form-control">
                                                <option defaultValue=""></option>
                                                <option defaultValue="BN">Bangladesh</option>
                                                <option defaultValue="IN">India</option>
                                                <option defaultValue="UK">United Kingdom</option>
                                                <option defaultValue="USA">United Stated</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <h4 className='text-start'>Travel Document</h4>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <label className="fs-6  float-start" htmlFor="">Document Type</label>
                                        <select name="travellers.0.title" placeholder="Title"
                                                        className="form-control">
                                            <option defaultValue="passport"> Passport</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fs-6 float-start" htmlFor="">Passport number</label>
                                        <input type="text"  className="form-control" name="passport-number"/>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fs-6 float-start" htmlFor="">Issuing country
                                        </label>
                                        <select name="travellers.0.title" placeholder="Title"
                                                        className="form-control">
                                            <option defaultValue=""></option>
                                            <option defaultValue="BG">Bangladesh</option>
                                            <option defaultValue="IN">India</option>
                                            <option defaultValue="UK">United Kingdom</option>
                                            <option defaultValue="USA">United States Of America</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <h5 className='text-start'>Passport Expiry Date</h5>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <select name="travellers.0.title" placeholder="Title"
                                                        className="form-control">
                                                        <option defaultValue="">Day</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option>12</option>
                                                        <option>13</option>
                                                        <option>14</option>
                                                        <option>15</option>
                                                        <option>16</option>
                                                        <option>17</option>
                                                        <option>18</option>
                                                        <option>19</option>
                                                        <option>20</option>
                                                        <option>21</option>
                                                        <option>22</option>
                                                        <option>23</option>
                                                        <option>24</option>
                                                        <option>25</option>
                                                        <option>26</option>
                                                        <option>27</option>
                                                        <option>28</option>
                                                        <option>29</option>
                                                        <option>30</option>
                                                        <option>31</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-3">
                                        <select
                                        name="travellers.0.birthDateMonth" className="form-control">
                                        <option defaultValue="">Month</option>
                                        <option defaultValue="0">01 - January</option>
                                        <option defaultValue="1">02 - February</option>
                                        <option defaultValue="2">03 - March</option>
                                        <option defaultValue="3">04 - April</option>
                                        <option defaultValue="4">05 - May</option>
                                        <option defaultValue="5">06 - June</option>
                                        <option defaultValue="6">07 - July</option>
                                        <option defaultValue="7">08 - August</option>
                                        <option defaultValue="8">09 - September</option>
                                        <option defaultValue="9">10 - October</option>
                                        <option defaultValue="10">11 - November</option>
                                        <option defaultValue="11">12 - December</option>
                                    </select>
                                    </div>
                                    <div className="col-lg-3">
                                        <select
                                        name="travellers.0.birthDateYear" className="form-control">
                                        <option defaultValue="">Year</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                        <option>2017</option>
                                        <option>2016</option>
                                        <option>2015</option>
                                        <option>2014</option>
                                        <option>2013</option>
                                        <option>2012</option>
                                        <option>2011</option>
                                        <option>2010</option>
                                        <option>2009</option>
                                        <option>2008</option>
                                        <option>2007</option>
                                        <option>2006</option>
                                        <option>2005</option>
                                        <option>2004</option>
                                        <option>2003</option>
                                        <option>2002</option>
                                        <option>2001</option>
                                        <option>2000</option>
                                        <option>1999</option>
                                        <option>1998</option>
                                        <option>1997</option>
                                        <option>1996</option>
                                        <option>1995</option>
                                        <option>1994</option>
                                        <option>1993</option>
                                        <option>1992</option>
                                        <option>1991</option>
                                        <option>1990</option>
                                        <option>1989</option>
                                        <option>1988</option>
                                        <option>1987</option>
                                        <option>1986</option>
                                        <option>1985</option>
                                        <option>1984</option>
                                        <option>1983</option>
                                        <option>1982</option>
                                        <option>1981</option>
                                        <option>1980</option>
                                        <option>1979</option>
                                        <option>1978</option>
                                        <option>1977</option>
                                        <option>1976</option>
                                        <option>1975</option>
                                        <option>1974</option>
                                        <option>1973</option>
                                        <option>1972</option>
                                        <option>1971</option>
                                        <option>1970</option>
                                        <option>1969</option>
                                        <option>1968</option>
                                        <option>1967</option>
                                        <option>1966</option>
                                        <option>1965</option>
                                        <option>1964</option>
                                        <option>1963</option>
                                        <option>1962</option>
                                        <option>1961</option>
                                        <option>1960</option>
                                        <option>1959</option>
                                        <option>1958</option>
                                        <option>1957</option>
                                        <option>1956</option>
                                        <option>1955</option>
                                        <option>1954</option>
                                        <option>1953</option>
                                        <option>1952</option>
                                        <option>1951</option>
                                        <option>1950</option>
                                        <option>1949</option>
                                        <option>1948</option>
                                        <option>1947</option>
                                        <option>1946</option>
                                        <option>1945</option>
                                        <option>1944</option>
                                        <option>1943</option>
                                        <option>1942</option>
                                        <option>1941</option>
                                        <option>1940</option>
                                        <option>1939</option>
                                        <option>1938</option>
                                        <option>1937</option>
                                        <option>1936</option>
                                        <option>1935</option>
                                        <option>1934</option>
                                        <option>1933</option>
                                        <option>1932</option>
                                        <option>1931</option>
                                        <option>1930</option>
                                        <option>1929</option>
                                        <option>1928</option>
                                        <option>1927</option>
                                        <option>1926</option>
                                        <option>1925</option>
                                        <option>1924</option>
                                        <option>1923</option>
                                        <option>1922</option>
                                        <option>1921</option>
                                        <option>1920</option>
                                        <option>1919</option>
                                        <option>1918</option>
                                        <option>1917</option>
                                        <option>1916</option>
                                        <option>1915</option>
                                        <option>1914</option>
                                        <option>1913</option>
                                        <option>1912</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <h6 className="text-success fw-bold text-start">Baggage Info</h6>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, Riyadh
                                            </span>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, Dubai
                                            </span>
                                    </div>
                                </div>
                                <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            NOT INCLUDE
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, Dubai
                                            </span>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, Riyadh
                                            </span>
                                    </div>
                                </div>
                                <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            NOT INCLUDE
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    );
};

export default AdultPerson;