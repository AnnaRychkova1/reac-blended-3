import { Container, CountryInfo, GoBackBtn, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const [countryValue, setCountryValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { countryId } = useParams();
  const location = useLocation();
  const goBackLink = location.state?.from ?? '/';

  useEffect(() => {
    setIsLoading(true);
    fetchCountry(countryId)
      .then(data => {
        setCountryValue(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [countryId]);

  return (
    <Section>
      <GoBackBtn to={goBackLink} />
      <Container>{countryValue && <CountryInfo {...countryValue} />}</Container>
      {isLoading && <Loader />}
    </Section>
  );
};

export default Country;
