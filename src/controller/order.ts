import { Request, Response } from 'express';
import { IOrder, IOrderItem } from '../types';
import Order from '../models/order';
import stripe from 'stripe';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

type CreateOrderRequestType = Pick<
  IOrder,
  'orderItems' | 'deliveryAddress' | 'totalPrice' | 'user'
>;

const BASE_UNIT = 100;

const getTotalAmount = (orderItems: IOrderItem[]) => {
  return (
    orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) * BASE_UNIT
  );
};

/**
 *
 * @param request
 * @param response
 *
 * 1. Get paymentIntent from Stripe, passing currency and order amount
 * 2. Save paymentIntentId in order model
 * 3. Send paymentIntentId.client_secret to client
 */

export const createOrder = async (request: Request, response: Response) => {
  try {
    const {
      orderItems,
      deliveryAddress,
      totalPrice,
      user,
    }: CreateOrderRequestType = request.body;

    const totalAmount = getTotalAmount(orderItems);

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
    });

    const order = await Order.create({
      user,
      deliveryAddress,
      orderItems,
      totalPrice,
      paymentIntentId: paymentIntent.id,
      paymentStatus: 'pending',
      paymentDetails: {},
    });
    response.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('error in createOrder', error);
      response.send({
        message: 'Something went wrong while creating order',
      });
      throw error;
    }
  }
};
