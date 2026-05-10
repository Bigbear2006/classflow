from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from classflow.application.use_cases.payment import (
    CreatePayment,
    CreatePaymentDTO,
    DeletePayment,
    DeletePaymentDTO,
)
from classflow.presentation.api.routers.payment.models import PaymentResponse

payment_router = APIRouter(
    prefix='/payments',
    route_class=DishkaRoute,
    tags=['payments'],
)


@payment_router.post('/', status_code=201)
async def create_payment_router(
    data: CreatePaymentDTO,
    create_payment: FromDishka[CreatePayment],
) -> PaymentResponse:
    payment = await create_payment(data)
    return PaymentResponse.model_validate(payment)


@payment_router.delete('/{payment_id}/', status_code=204)
async def delete_payment_router(
    payment_id: int,
    delete_payment: FromDishka[DeletePayment],
) -> None:
    dto = DeletePaymentDTO(id=payment_id)
    await delete_payment(dto)
