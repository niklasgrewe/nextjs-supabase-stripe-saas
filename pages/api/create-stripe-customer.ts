import Stripe from 'stripe'
import { supabase } from '../../utils/supabase'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('You are not authorized to call this API')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2020-08-27',
  })

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  })

  await supabase
    .from('profile')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', req.body.record.id)

  res.send({ message: `stripe customer created: ${customer.id}` })
}

export default handler
