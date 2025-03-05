// Fix the duplicate United Kingdom option in the country select
<select 
  id="country" 
  name="country"
  value={profileData.country}
  onChange={handleChange}
  className="w-full px-4 py-2 bg-indigo-900/30 border border-indigo-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
  aria-label="Select your country"
>
  <option value="">Select your country</option>
  <option value="United States">United States</option>
  <option value="Canada">Canada</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="Australia">Australia</option>
  <option value="Germany">Germany</option>
  <option value="France">France</option>
  <option value="Japan">Japan</option>
  <option value="China">China</option>
  <option value="India">India</option>
  <option value="Brazil">Brazil</option>
  <option value="South Africa">South Africa</option>
  <option value="Nigeria">Nigeria</option>
  <option value="Other">Other</option>
</select>