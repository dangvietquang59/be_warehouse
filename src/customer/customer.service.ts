import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[Customer[], number]> {
    const [customers, total] = await this.customerRepository.findAndCount({
      relations: ['salesOrders'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return [customers, total];
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOneOrFail({
      where: { id },
      relations: ['salesOrders'],
    });
  }

  async update(id: string, dto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['salesOrders'],
    });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    await this.customerRepository.update(id, dto);
    const updatedCustomer = await this.customerRepository.findOne({
      where: { id },
      relations: ['salesOrders'],
    });
    if (!updatedCustomer) {
      throw new NotFoundException(
        `Customer with id ${id} not found after update`,
      );
    }
    return updatedCustomer;
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    await this.customerRepository.delete(id);
  }
} 