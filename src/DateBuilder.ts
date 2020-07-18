class DateBuilder {
  private month?: number;
  private day?: number;

  get january() {
    return this.selectMonth(0);
  }
  get february() {
    return this.selectMonth(1);
  }

  get first() {
    return this.selectDay(1);
  }
  get second() {
    return this.selectDay(2);
  }
  get third() {
    return this.selectDay(3);
  }

  get date() {
    const now = new Date();
    return new Date(now.getUTCFullYear(), this.month ?? now.getUTCMonth(), this.day ?? now.getUTCDay());
  }

  private selectMonth(month: number): this {
    if (this.month !== undefined) throw new Error('Month already selected');
    this.month = month;
    return this;
  }

  private selectDay(day: number): this {
    if (this.day !== undefined) throw new Error('Day already selected');
    this.day = day;
    return this;
  }
}
const d = new Proxy<DateBuilder>({} as any, {
  get() {
    return new DateBuilder();
  },
});
