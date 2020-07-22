import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'
import Modal from '~/components/_shared/Modal'
import { NewsLetterForm } from '~/components/NewsLetter'

const IndexPage = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    const hasJoinedMailingList = localStorage.getItem('hasJoinedMailingList');
    const hasSeenEmailModalThisSession = sessionStorage.getItem('hasSeenEmailModal');

    if (!hasJoinedMailingList && !hasSeenEmailModalThisSession) {
      setIsEmailModalOpen(true);
    }
  }, [])

  return (
    <>
      <SEO
        title="Home"
        keywords={[
          `blissful`,
          `wizard`,
          `blissful wizard`,
          `tiedye`,
          `tie dye`,
          `tie-dye`,
          `clothing`,
          `apparel`,
          `psychedlic`,
        ]}
      />
      <ProductGrid />
      <Modal className="one" open={isEmailModalOpen} closeModal={() => setIsEmailModalOpen(false)}>
        <NewsLetterForm cancel={() => setIsEmailModalOpen(false)}/>
      </Modal>
    </>
  )
}

export default IndexPage
