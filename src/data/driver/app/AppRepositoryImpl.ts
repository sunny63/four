import { makeAutoObservable } from 'mobx';
import { injectable } from 'inversify';
import User from 'domain/entity/app/User';
import Step from 'domain/entity/app/Step';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class AppRepositoryImpl implements AppRepository {
    private user: User = new User(NaN, 'visitor');

    private step: Step = Step.InputData;

    constructor() {
        makeAutoObservable(this);
    }

    public getStep(): Step {
        return this.step;
    }

    public setStep(step: Step) {
        this.step = step;
    }

    // eslint-disable-next-line class-methods-use-this
    public getUser(): User {
        return this.user;
    }

    // eslint-disable-next-line class-methods-use-this
    public setUser(user: User): void {
        this.user = user;
    }
}
